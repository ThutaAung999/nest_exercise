import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Headers,
  Ip,
  Header,
  Redirect,
  HttpException,
  HttpStatus,
  //UseFilters,
  ParseIntPipe,
  UseGuards,
  UseInterceptors,
  //UsePipes,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import {
  CreateTodoDto,
  //  CreateTodoSchema
} from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { QueryTodoDto } from './dto/query-todo.dto';
import { DtoValidationWithClassValidatorPipe } from 'src/pipes/dto-validation_with_class-validator/dto-validation_with_class-validator.pipe';
//import { AuthGuard } from 'src/auth/auth.guard';
import { TodoDecorator } from './todo.decorator';
//import { LoggingInterceptor } from 'src/logging/logging.interceptor';
//import { JoiValidationPipe } from 'src/pipes/joi-validation/joi-validation.pipe';
//import { HttpExceptionFilter } from 'src/http-exception/http-exception.filter';

//@UseFilters(new HttpExceptionFilter())
@Controller('todo')
//@UseGuards(AuthGuard)
//@UseInterceptors(LoggingInterceptor)
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  //@UsePipes(new JoiValidationPipe(CreateTodoSchema))
  @Header('Cache-Control', 'no-cache')
  create(
    @Body(new DtoValidationWithClassValidatorPipe())
    createTodoDto: CreateTodoDto,
  ) {
    return this.todoService.create(createTodoDto);
  }

  @Get()
  findAll() {
    return this.todoService.findAll();
  }
  @Get('/ab*cd')
  wildcard(@TodoDecorator() header: any) {
    console.log(' Todo Request Header Authorization: ', header.authorization);
    return 'wildcard';
  }
  @Get('/query')
  query(
    @Query() queryTodoDto: QueryTodoDto,
    /*     @Query('title') title: string,
    @Query('name') name: string, */
    @Headers() headers: any,
    @Ip() ip: string,
  ) {
    console.log('Headers :', headers);
    console.log('IP :', ip);
    return (
      'Query Result :' +
      /* title +
      '  ' +
      name + */
      '\n\n' +
      'queryTodoDto.id :' +
      queryTodoDto.id +
      ',\n' +
      'queryTodoDto.title :' +
      queryTodoDto.title +
      ',\n' +
      'queryTodoDto.name :' +
      queryTodoDto.name
    );
  }

  @Get('/problem')
  //@UseFilters(new HttpExceptionFilter())
  problem() {
    //throw new Error('Problem');
    //throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    const errorResponse = {
      statusCode: HttpStatus.FORBIDDEN,
      errorDetails: 'Something went wrong',
      message: {
        description: 'Customer error message',
      },
    };
    throw new HttpException(errorResponse, HttpStatus.FORBIDDEN);
  }

  @Get('/redirect')
  @Redirect('https://nestjs.com', 301)
  redirect() {
    // return 'Redirect Result';
  }

  @Get(':id')
  //async findOne(@Param('id', ParseIntPipe) id: string) {
  findOne(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    return this.todoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todoService.update(+id, updateTodoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.todoService.remove(+id);
  }
}
