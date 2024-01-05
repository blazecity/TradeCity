using Clients;
using Grpc.Core;
using TradeCity.Clients.Data.Repositories;

namespace TradeCity.Clients.Grpc.Server.Services;

public class ClientsService : ClientAdministration.ClientAdministrationBase
{
    private readonly ClientsRepository _repository = new();
    
    public override Task<AddClientResponse> AddClient(BaseClient request, ServerCallContext context)
    {
        var client = new Core.Client
        {
            Name = request.Name,
            BloombergCode = request.BloombergCode,
            Key = request.Key
        };
        var id = this._repository.Insert(client);
        return Task.FromResult(new AddClientResponse { Id = id });
    }

    public override Task<UpdateClientResponse> UpdateClient(UpdateClientRequest request, ServerCallContext context)
    {
        var client = new Core.Client
        {
            Id = request.Id,
            Name = request.Client.Name,
            BloombergCode = request.Client.BloombergCode,
            Key = request.Client.Key
        };
        this._repository.Update(client);
        return Task.FromResult(new UpdateClientResponse { Successful = true });
    }

    public override Task<DeleteClientResponse> DeleteClient(DeleteClientRequest request, ServerCallContext context)
    {
        this._repository.Delete(request.Id);
        return Task.FromResult(new DeleteClientResponse { Successful = true });
    }

    private SingleClient Map(Core.Client client)
    {
        return new SingleClient
        {
            Id = client.Id,
            Name = client.Name,
            BloombergCode = client.BloombergCode,
            Key = client.Key,
            Active = client.Active
        };
    }

    public override Task<SingleClient> GetClientById(GetClientByIdRequest request, ServerCallContext context)
    {
        var client = this._repository.GetById(request.Id);
        return Task.FromResult(client == null ? new SingleClient() : this.Map(client));
    }

    public override Task<SingleClient> GetClientByKey(GetClientByKeyRequest request, ServerCallContext context)
    {
        var client = this._repository.GetByKey(request.Key);
        return Task.FromResult(client == null ? new SingleClient() : this.Map(client));
    }

    public override Task<SingleClient> GetClientByBloombergCode(GetClientByBloombergCodeRequest request, ServerCallContext context)
    {
        var client = this._repository.GetByBloombergCode(request.BloombergCode);
        return Task.FromResult(client == null ? new SingleClient() : this.Map(client));
    }

    public override Task<ClientList> GetClientsByName(GetClientByNameRequest request, ServerCallContext context)
    {
        var clients = this._repository.GetByName(request.Name).Select(this.Map).ToList();
        var list = new ClientList();
        list.Clients.AddRange(clients);
        return Task.FromResult(list);
    }
}