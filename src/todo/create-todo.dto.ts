import { ApiProperty } from "@nestjs/swagger";

export class CreateTodoDto {
    @ApiProperty({ required: true })
    title: string;
    @ApiProperty({ required: true })
    task: string;
}