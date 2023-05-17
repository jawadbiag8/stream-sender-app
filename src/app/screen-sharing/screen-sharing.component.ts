import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SocketService } from '../socket.service';
import { io } from 'socket.io-client';

@Component({
  selector: 'app-screen-sharing',
  templateUrl: './screen-sharing.component.html',
  styleUrls: ['./screen-sharing.component.css']
})
export class ScreenSharingComponent implements OnInit {
  @ViewChild('canvas') canvas?: ElementRef;
  @ViewChild('sharedVideo') sharedVideo!: ElementRef<HTMLVideoElement>;

  constructor(private socketService: SocketService) { }
  ngOnInit(): void {
    const socket = io('http://localhost:3080');

    navigator.mediaDevices
      .getDisplayMedia({ video: true })
      .then(stream => {
        const context = this.canvas?.nativeElement.getContext('2d');

        const video = document.createElement('video');
        video.srcObject = stream;
        video.onloadedmetadata = () => {
          video.play();
          setInterval(() => {
            context.drawImage(video, 0, 0, this.canvas?.nativeElement.width, this.canvas?.nativeElement.height);
            const imageData = this.canvas?.nativeElement.toDataURL('image/png');
            socket.emit('stream', imageData);
          }, 100);
        };
      })
      .catch(error => {
        console.error('Error accessing screen:', error);
      });

    socket.on('stream', image => {
      const img = document.createElement('img');
      img.src = image;
    });
  }

  startScreenSharing(): void {
    navigator.mediaDevices.getDisplayMedia({ video: true }).then((stream: MediaStream) => {
      // Call the SocketService method to start screen sharing
      this.socketService.startScreenSharing(stream);
      // this.sharedVideo.nativeElement.srcObject = stream;
    }).catch((error) => {
      console.error('Error accessing media devices:', error);
    });
  }

  stopScreenSharing(): void {
    // Call the SocketService method to stop screen sharing
    this.socketService.stopScreenSharing();
    const stream = this.sharedVideo.nativeElement.srcObject as MediaStream;
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      this.sharedVideo.nativeElement.srcObject = null;
    }
  }
}