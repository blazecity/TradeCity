using HotChocolate;
using HotChocolate.Types;

namespace TradeCity.Counterparty.GraphQL.Entities;

public struct Counterparty
{
    [GraphQLType(typeof(UnsignedLongType))]
    public ulong Id { get; init; }
    public string Name { get; init; }
    public string Key { get; init; }
    public string BloombergCode { get; init; }
    public bool Active { get; init; }
}