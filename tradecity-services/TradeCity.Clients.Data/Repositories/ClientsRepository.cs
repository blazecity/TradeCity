using TradeCity.Clients.Core;

namespace TradeCity.Clients.Data.Repositories;

public class ClientsRepository
{
    private readonly ClientsDbContext _dbContext = new();

    public ulong Insert(Client client)
    {
        var entity = this._dbContext.Clients.Add(client);
        this._dbContext.SaveChanges();
        return entity.Entity.Id;
    }

    public bool Update(Client client)
    {
        var clientEntity = this._dbContext.Find<Client>(client.Id);
        if (clientEntity == null) return false;
        
        clientEntity.Name = client.Name;
        clientEntity.BloombergCode = client.BloombergCode;
        
        this._dbContext.SaveChanges();

        return true;
    }

    public bool Delete(ulong clientId)
    {
        var client = this._dbContext.Clients.Find(clientId);
        if (client == null) return false;
        client.Active = false;
        this._dbContext.SaveChanges();
        return true;
    }

    public Client? GetById(ulong clientId)
    {
        return this._dbContext.Find<Client>(clientId);
    }
    
    public Client? GetByKey(string key)
    {
        var resultList = this._dbContext.Clients.Where(client => client.Key == key).Take(1);
        return resultList.Any() ? resultList.Single() : null;
    }

    public List<Client> GetByName(string name)
    {
        return this._dbContext.Clients.Where(client => client.Name.Contains(name)).ToList();
    }

    public Client? GetByBloombergCode(string code)
    {
        var resultList = this._dbContext.Clients.Where(client => client.BloombergCode == code).Take(1);
        return resultList.Any() ? resultList.Single() : null;
    }
}