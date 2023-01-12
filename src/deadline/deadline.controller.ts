import {Body, Controller, Delete, Post, Put, Req} from '@nestjs/common';
import { DeadlineService } from './deadline.service';

@Controller('')
export class DeadlineController {
  constructor(private readonly deadlineService: DeadlineService) {}

  @Post('deadlines')
  async get_deadlines() {
    return this.deadlineService.get_deadlines();
  }

  @Put('deadlines')
  async add_deadline(@Body() body) {
    return this.deadlineService.add_deadline(body);
  }

  @Put('deadlines/:id/complete')
  async complete_deadline(@Req() req) {
    return this.deadlineService.complete_deadline(req.params.id, true);
  }

  @Delete('deadlines/:id/complete')
  async return_deadline(@Req() req) {
    return this.deadlineService.complete_deadline(req.params.id, false);
  }
}
