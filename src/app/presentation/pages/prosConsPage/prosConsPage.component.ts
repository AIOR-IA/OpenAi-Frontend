import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ChatMessageComponent, MyMessageComponent, TextMessageBoxComponent, TypingLoaderComponent } from '@components/index';
import { Message } from '@interfaces/message.interface';
import { OpenAiService } from 'app/presentation/services/openai.service';

@Component({
  selector: 'app-pros-cons-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ChatMessageComponent,
    MyMessageComponent,
    TypingLoaderComponent,
    TextMessageBoxComponent,
  ],
  templateUrl: './prosConsPage.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProsConsPageComponent {

  public messages = signal<Message[]>([]);
  public isLoading = signal(false);
  public openAiService = inject( OpenAiService );



  handleMessage( prompt: string ) {

    this.isLoading.set( true );
    this.messages.update( (prevSms) => [
      ...prevSms,
      {
        isGpt: false,
        text: prompt
      }
    ]);

    this.isLoading.set(true);
    this.openAiService.prosConsDiscusser( prompt )
      .subscribe( res => {
        this.isLoading.set(false);

        this.messages.update( prev => [
          ...prev,
          {
            isGpt: true,
            text: res.content
          }
        ])
      })


  }

 }
