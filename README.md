# 🎟 Rafaeller: the raffler 2.0

## Usage
To run locally, you must first spin up the WebSocket raffle server that communicates
with the front-end (this repository).
```shell
docker run synon/raffler-server -p 8000:8080
npm start
```

The raffler should now be available at `http://localhost:3000`.


1. At the site root, you'll find the host screen. 
2. Start a raffle by entering the "host key" (`admin` by default)
3. Players can now join at `/join` with the randomly generated 4 digit join code.
4. When enough players have joined, press `[SPACE]` to pick a winner.
5. You can pick winners indefinitely, the raffle pool will stay open until you close the tab or refresh.