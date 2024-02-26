using TradeCity.Utilities.Error;
using TradeCity.Utilities.Error.Handling;
using TradeCity.Utilities.Functional;

namespace TradeCity.Counterparty.Data.Repositories;

public class CounterpartyRepository
{
    private readonly CounterpartyDbContext _dbContext;

    public CounterpartyRepository(CounterpartyDbContext dbContext)
    {
        this._dbContext = dbContext;
    }

    public Result<Entities.Counterparty> GetById(ulong id)
    {
        var connectionResult = DatabaseHandler.CheckDatabase(this._dbContext.Database.CanConnect());

        return connectionResult.Match(
            _ =>
            {
                var cpEntity = this._dbContext.Find<Entities.Counterparty>(id);
                if (cpEntity == null) return new TradeCityException("no data found", ErrorCodes.NotFound.GetCode());
                return cpEntity;
            },
            Result.Err<Entities.Counterparty>
            );
    }

    public Result<Entities.Counterparty> GetByKey(string key)
    {
        DatabaseHandler.CheckDatabase(this._dbContext.Database.CanConnect());
        
        var results = this._dbContext.Counterparties.Where(client => client.Key == key).Take(1);
        return results.Any() ? results.Single() : new TradeCityException("", "");
    }

    public List<Entities.Counterparty> GetByName(string name)
    {
        DatabaseHandler.CheckDatabase(this._dbContext.Database.CanConnect());
        
        return this._dbContext.Counterparties.Where(client => client.Name.Contains(name)).ToList();
    }

    public Result<Entities.Counterparty> GetByBloombergCode(string code)
    {
        DatabaseHandler.CheckDatabase(this._dbContext.Database.CanConnect());
        
        var resultList = this._dbContext.Counterparties.Where(client => client.BloombergCode == code).Take(1);
        return resultList.Any() ? resultList.Single() : new TradeCityException("", "");
        
    }
    
    public ulong Insert(Entities.Counterparty counterparty)
    {
        DatabaseHandler.CheckDatabase(this._dbContext.Database.CanConnect());
        
        var entity = this._dbContext.Counterparties.Add(counterparty);
        this._dbContext.SaveChanges();
        return entity.Entity.Id;
    }
    
    public Result<Unit> Update(ulong id, Action<Entities.Counterparty> updater)
    {
        var result = this.GetById(id);

        return result.Match(
            cpEntity =>
            {
                updater(cpEntity);
                this._dbContext.SaveChanges();
                return new Unit();
            }, 
            Result.Err<Unit>
        );
    }

    public Result<Unit> Delete(ulong id)
    {
        return this.Update(id, cp => cp.Active = false);
    }
}