import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: Socket;

  constructor() {
    this.socket = io('http://localhost:3500'); // Replace with your Socket.io server URL
  }

  // startScreenSharing(stream: MediaStream): void {
  //   const mediaRecorder = new MediaRecorder(stream, { mimeType: 'video/webm' });
  //   const recordedChunks: Blob[] = [];

  //   mediaRecorder.ondataavailable = (event) => {
  //     if (event.data.size > 0) {
  //       recordedChunks.push(event.data);
  //     }
  //   };

  //   mediaRecorder.onstop = () => {
  //     const blob = new Blob(recordedChunks, { type: 'video/webm' });
  //     const fileReader = new FileReader();
  //     fileReader.onload = () => {
  //       const arrayBuffer = fileReader.result as ArrayBuffer;
  //       this.socket.emit('stream-data', 'target-client-id', new Uint8Array(arrayBuffer));
  //     };
  //     fileReader.readAsArrayBuffer(blob);
  //   };

  //   mediaRecorder.start();
  // }
  startScreenSharing(stream: MediaStream): void {
    const mediaRecorder = new MediaRecorder(stream, { mimeType: 'video/webm' });
    const recordedChunks: Blob[] = [];
  
    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        recordedChunks.push(event.data);
      }
    };
  
    mediaRecorder.onstop = () => {
      const blob = new Blob(recordedChunks, { type: 'video/webm' });
      const fileReader = new FileReader();
      fileReader.onload = () => {
        const arrayBuffer = fileReader.result as ArrayBuffer;
        this.socket.emit('stream-data', 'target-client-id', new Uint8Array(arrayBuffer));
      };
      fileReader.readAsArrayBuffer(blob);
    };
  
    mediaRecorder.onstart = () => {
      // Send a message to the server to indicate that screen sharing has started
      this.socket.emit('start-screen-sharing');
    };
  
    mediaRecorder.start();
  }
  
  stopScreenSharing(): void {
    // Send a message to the server to stop screen sharing
    this.socket.emit('stop-screen-sharing');
  }
}
