FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
USER $APP_UID
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["TradeCity.Webserver.Core/TradeCity.Webserver.Core.csproj", "TradeCity.Webserver.Core/"]
RUN dotnet restore "TradeCity.Webserver.Core/TradeCity.Webserver.Core.csproj"
COPY . .
WORKDIR "/src/TradeCity.Webserver.Core"
RUN dotnet build "TradeCity.Webserver.Core.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "TradeCity.Webserver.Core.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "TradeCity.Webserver.Core.dll"]
