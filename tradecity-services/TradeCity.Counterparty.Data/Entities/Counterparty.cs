using System.ComponentModel.DataAnnotations.Schema;

namespace TradeCity.Counterparty.Data.Entities;

[Table("counterparty", Schema = "counterparty_service")]
public class Counterparty
{
    [Column("id")] public ulong Id { get; init; }
    [Column("name")] public string Name { get; set; } = string.Empty;
    [Column("key")] public string Key { get; set; } = string.Empty;
    [Column("bloomberg_code")] public string BloombergCode { get; set; } = string.Empty;
    [Column("active")] public bool Active { get; set; }
}