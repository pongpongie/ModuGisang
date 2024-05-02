import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { OpenviduService } from './openvidu.service';

@Controller('api')
export class OpenviduController {
    constructor(private readonly openviduService:OpenviduService){}

    @Post('startSession')
    async startSession(@Body() body:any){
        if (!body.userData) {
            throw new HttpException('userData is required', HttpStatus.BAD_REQUEST);
        }

        const { challengeId, userId, userName } = body.userData;
        if (!challengeId || !userId || !userName) {
            throw new HttpException('Missing required fields', HttpStatus.BAD_REQUEST);
        }

        if (challengeId.trim() === '' || userId.trim() === '' || userName.trim() === '') {
            throw new HttpException('Fields cannot be empty', HttpStatus.BAD_REQUEST);
        }
        const token = await this.openviduService.openviduTotalService(body); // 사용자 데이터에 대한 정보로 세션과 커넥션 생성 후 토큰 반환
        return {
            "token": token
        }
    }
 
}
