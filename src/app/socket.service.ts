import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  public socket: Socket;
  id: string = ""

  private idNotifier = new BehaviorSubject(this.id)

  getId$ = this.idNotifier.asObservable()

  constructor() {
    this.socket = io('http://localhost:3080'); // Replace with your Socket.io server URL
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
      const blob = new Blob(recordedChunks, { type: 'video/webm' });
      const fileReader = new FileReader();
      fileReader.onload = () => {
        const arrayBuffer = fileReader.result as ArrayBuffer;
        this.socket.emit('start-screen-sharing', this.socket.id, recordedChunks);
      };
      fileReader.readAsArrayBuffer(blob);
    };
  
    mediaRecorder.onstop = () => {
      const blob = new Blob(recordedChunks, { type: 'video/webm' });
      const fileReader = new FileReader();
      fileReader.onload = () => {
        const arrayBuffer = fileReader.result as ArrayBuffer;
        this.socket.emit('start-screen-sharing', this.socket.id, new Uint8Array(arrayBuffer));
      };
      fileReader.readAsArrayBuffer(blob);
    };
  
    mediaRecorder.onstart = () => {
      // Send a message to the server to indicate that screen sharing has started
      this.socket.emit('start-screen-sharing', this.socket.id);
      this.idNotifier.next(this.socket.id);
    };
  
    mediaRecorder.start(1000);
  }
  
  
  stopScreenSharing(): void {
    // Send a message to the server to stop screen sharing
    this.socket.emit('stop-screen-sharing');
  }
}
