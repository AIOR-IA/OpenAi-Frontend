import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ChatMessageComponent, MyMessageComponent, TextMessageBoxComponent, TextMessageBoxEvent, TextMessageBoxSelectComponent, TypingLoaderComponent } from '@components/index';
import { TextMessageBoxFileComponent, TextMessageEvent } from '@components/text-boxes/textMessageBoxFile/textMessageBoxFile.component';
import { Message } from 'app/interfaces';
import { OpenAiService } from '../../services/openai.service';
import { GptMessageOrthographyComponent } from '@components/chat-bubbles/gptMessageOrthography/gptMessageOrthography.component';



@Component({
  selector: 'app-orthography-page',
  standalone: true,
  imports: [
    CommonModule,
    ChatMessageComponent,
    MyMessageComponent,
    TypingLoaderComponent,
    GptMessageOrthographyComponent,

    TextMessageBoxComponent,
    TextMessageBoxFileComponent,
    TextMessageBoxSelectComponent,
  ],
  templateUrl: './orthographyPage.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrthographyPageComponent {

  public messages = signal<Message[]>([{ text:'Hi world', isGpt: false }])
  public isLoading = signal(false);
  public openAiService = inject( OpenAiService);


  handleMessage( prompt: string ) {

    this.isLoading.set( true );
    this.messages.update( (prevSms) => [
      ...prevSms,
      {
        isGpt: false,
        text: prompt
      }
    ]);

    this.openAiService.checkOrthography( prompt )
      .subscribe( res => {
        this.isLoading.set( false );

        this.messages.update( prev => [
          ...prev,
          {
            isGpt: true,
            text: res.message,
            info: res,
          }
        ])

      })

  }

  handleMessageWithFile( {  prompt,file }: TextMessageEvent ) {

    console.log({ prompt,file });

  }

  handleMessageWithSelect( event: TextMessageBoxEvent ) {
    console.log({event})

  }
 }
