import * as signalR from '@microsoft/signalr';

const connection = new signalR.HubConnectionBuilder()
    .withUrl('http://localhost:5108/taskhub')
    .withAutomaticReconnect()
    .configureLogging(signalR.LogLevel.Information)
    .build();

connection.start()
    .then(() => console.log('SignalR Connected'))
    .catch(err => console.error('SignalR Connection Error: ', err));

export default connection;
