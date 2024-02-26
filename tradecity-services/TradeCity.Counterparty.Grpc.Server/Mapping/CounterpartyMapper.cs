namespace TradeCity.Counterparty.Grpc.Server.Mapping;

public class CounterpartyMapper
{
    public static Grpc.Messages.Counterparty MapFromEntity(Data.Entities.Counterparty counterparty)
    {
        return new Messages.Counterparty
        {
            Id = counterparty.Id,
            Name = counterparty.Name,
            Key = counterparty.Key,
            BloombergCode = counterparty.BloombergCode,
            Active = counterparty.Active
        };
    }
}