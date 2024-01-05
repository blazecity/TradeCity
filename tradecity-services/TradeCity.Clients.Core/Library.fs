namespace TradeCity.Clients.Core

open System
open System.ComponentModel.DataAnnotations.Schema

[<Table("client")>]
type Client() =
    [<Column("id")>] member val Id: uint64 = 0UL with get, set
    [<Column("name")>] member val Name = String.Empty with get, set
    [<Column("bloomberg_code")>] member val BloombergCode = String.Empty with get, set
    [<Column("key")>] member val Key = String.Empty with get, set
    [<Column("active")>] member val Active = true with get, set
