FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["TradeCityGraphQL/TradeCityGraphQL.fsproj", "TradeCityGraphQL/"]
RUN dotnet restore "TradeCityGraphQL/TradeCityGraphQL.fsproj"
COPY . .
WORKDIR "/src/TradeCityGraphQL"
RUN dotnet build "TradeCityGraphQL.fsproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "TradeCityGraphQL.fsproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "TradeCityGraphQL.dll"]
