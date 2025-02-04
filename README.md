# Moment 2 - Backend Web Service

## Beskrivning

Moment 2 Backend är en RESTful API byggd med NestJS och TypeORM som hanterar data om spel. Applikationen erbjuder CRUD-funktionalitet för att hantera spel och lagra information som namn, utgivningsår, när spelaren började spela, om spelet är klart, på vilken plattform det spelades och användarens betyg på spelet.

## Teknologier

- **NestJS**: Webbramverk för att bygga effektiva och skalbara server-side-applikationer.
- **TypeORM**: ORM för att interagera med databasen.
- **MySQL**: Relationsdatabas för att lagra speldata.
- **dotenv**: För att hantera konfigurationen och säkerhetsinformation via miljövariabler.

## Installation

För att installera och köra detta projekt lokalt, följ dessa steg:

1. Kloning av repo:

```
git clone https://github.com/username/moment2-backend.git
cd moment2-backend
```

2. Installera beroenden:

```
npm install
```

3. Konfigurera databasen: Se till att du har en MySQL-databas upprättad och skapa en .env-fil i projektets rotmapp. Exempel på innehåll:

```
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=din_db_användare
DB_PASSWORD=din_db_lösenord
DB_NAME=moment2
```

4. Starta applikationen:

```
npm run start
```

Detta startar servern på http://localhost:3000.

## API Endpoints

1. **Hämta alla spel**

    - Metod: GET
    - URL: /games
    - Svar:
      ```
      [
        {
          "id": 1,
          "name": "Super Mario",
          "releaseYear": 1985,
          "startDate": "2023-01-01",
          "completed": true,
          "platform": "NES",
          "rating": 8
        },
        ...
      ]
      ```

2. **Hämta ett spel med specifikt ID**

    - Metod: GET
    - URL: /games/:id
    - Svar:
      ```
      {
        "id": 1,
        "name": "Super Mario",
        "releaseYear": 1985,
        "startDate": "2023-01-01",
        "completed": true,
        "platform": "NES",
        "rating": 8
      }
      ```

3. **Lägg till ett nytt spel**

    - Metod: POST
    - URL: /games
    - Request Body:
      ```
      {
        "name": "Zelda",
        "releaseYear": 1986,
        "startDate": "2023-06-01",
        "completed": false,
        "platform": "NES",
        "rating": 9
      }
      ```
    - Svar:
      ```
      {
        "id": 2,
        "name": "Zelda",
        "releaseYear": 1986,
        "startDate": "2023-06-01",
        "completed": false,
        "platform": "NES",
        "rating": 9
      }
      ```

4. **Uppdatera ett spel**

    - Metod: PUT
    - URL: /games/:id
    - Request Body:
      ```
      {
        "name": "Zelda: Breath of the Wild",
        "releaseYear": 2017,
        "startDate": "2023-06-01",
        "completed": true,
        "platform": "Switch",
        "rating": 10
      }
      ```
    - Svar:
      ```
      {
        "id": 2,
        "name": "Zelda: Breath of the Wild",
        "releaseYear": 2017,
        "startDate": "2023-06-01",
        "completed": true,
        "platform": "Switch",
        "rating": 10
      }
      ```

5. **Ta bort ett spel**

    - Metod: DELETE
    - URL: /games/:id
    - Svar: HTTP 204 No Content (ingen body)

## Validering och felhantering

Alla indata till API:et valideras innan de lagras i databasen. Om ett fält saknas eller om data är felaktig kommer ett detaljerat felmeddelande att returneras.

Exempel på felmeddelande:

```
{
  "statusCode": 400,
  "message": "Rating must be between 1 and 10",
  "error": "Bad Request"
}
```
