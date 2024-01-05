FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
USER $APP_UID
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["TradeCity.Clients.Grpc.Server/TradeCity.Clients.Grpc.Server.csproj", "TradeCity.Clients.Grpc.Server/"]
RUN dotnet restore "TradeCity.Clients.Grpc.Server/TradeCity.Clients.Grpc.Server.csproj"
COPY . .
WORKDIR "/src/TradeCity.Clients.Grpc.Server"
RUN dotnet build "TradeCity.Clients.Grpc.Server.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "TradeCity.Clients.Grpc.Server.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "TradeCity.Clients.Grpc.Server.dll"]
