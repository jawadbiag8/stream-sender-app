import { Component, ElementRef, ViewChild } from '@angular/core';
import { SocketService } from '../socket.service';

@Component({
  selector: 'app-screen-sharing',
  templateUrl: './screen-sharing.component.html',
  styleUrls: ['./screen-sharing.component.css']
})
export class ScreenSharingComponent {
  @ViewChild('sharedVideo') sharedVideo!: ElementRef<HTMLVideoElement>;

  constructor(private socketService: SocketService) {}

  startScreenSharing(): void {
    navigator.mediaDevices.getDisplayMedia({ video: true }).then((stream: MediaStream) => {
      // Call the SocketService method to start screen sharing
      this.socketService.startScreenSharing(stream);
      this.sharedVideo.nativeElement.srcObject = stream;
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