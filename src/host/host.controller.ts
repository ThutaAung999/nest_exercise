import { Controller, Get, HostParam } from '@nestjs/common';

@Controller({ host: ':account.example.com' })
export class HostController {
  @Get()
  getInfo(@HostParam('account') account: string) {
    return account;
  }
}
