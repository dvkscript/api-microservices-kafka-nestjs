import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { StatusCode } from 'src/libs/exceptions/codes.exception';

@Injectable()
export class TgService {
    constructor(
        private readonly http: HttpService
    ) { }

    async generateMessage(prompt: string) {
        try {
            const res = await firstValueFrom(
                this.http.post("/api/generate", {
                    model: "mistral",
                    prompt,
                    stream: false
                })
            );
            console.log(res);
            
            if (res.status !== 200) {
                throw new HttpException("INTERNAL_SERVER_ERROR", StatusCode.INTERNAL_SERVER_ERROR, {
                    description: res?.request?.data?.error ||"Ollama API error",
                });
            }
            return res.data;
        } catch (error) {
            throw new HttpException("INTERNAL_SERVER_ERROR", StatusCode.INTERNAL_SERVER_ERROR, {
                description: error?.response?.data?.error ||"Ollama API error",
            })
        }
    }
}
