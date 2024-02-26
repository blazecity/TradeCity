namespace TradeCity.Counterparty.GraphQL.Entities;

public static class CounterpartyMapper
{
    public static Counterparty? FromGrpc(Grpc.Messages.Counterparty? counterparty)
    {
        if (counterparty == null) return null;

        return new Counterparty
        {
            Id = counterparty.Id,
            Name = counterparty.Name,
            Key = counterparty.Key,
            BloombergCode = counterparty.BloombergCode,
            Active = counterparty.Active
        };
    }
}