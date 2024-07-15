import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as TelegramBot from 'node-telegram-bot-api';
import { UserService } from '../user/user.service';
import { UserEntity } from '../user/entities/user/user.entity';
import { getSocialMediaButtons } from './buttons/social-media-buttons';

@Injectable()
export class TelegramService implements OnModuleInit {
  private bot: TelegramBot;

  constructor(
    private configService: ConfigService,
    private userService: UserService,
  ) {}

  onModuleInit() {
    this.bot = new TelegramBot(this.configService.get('app.telegramBotToken'), {
      polling: true,
    });

    // Handle /register command
    this.bot.onText(/\/register/, (msg) => this.registerUser(msg));

    // Handle /start command
    this.bot.onText(/\/start/, (msg) => this.startCommand(msg));
  }

  async registerUser(msg: TelegramBot.Message) {
    const { id: telegramId, username } = msg.from;
    const userUsername = username || `user_${telegramId}`;

    const existingUser = await this.userService.findOne(telegramId.toString());

    if (existingUser) {
      this.bot.sendMessage(
        msg.chat.id,
        `${existingUser.username} is already registered!`,
      );
      this.sendWelcomeMessage(msg.chat.id, existingUser);
    } else {
      const user = await this.userService.create({
        telegramId: telegramId.toString(),
        username: userUsername,
      });
      this.bot.sendMessage(
        msg.chat.id,
        `${user.username} is successfully registered!`,
      );
      this.sendWelcomeMessage(msg.chat.id, user);
    }
  }

  async startCommand(msg: TelegramBot.Message) {
    const { id: telegramId } = msg.from;

    const existingUser = await this.userService.findOne(telegramId.toString());

    if (existingUser) {
      this.sendWelcomeMessage(msg.chat.id, existingUser);
    } else {
      this.bot.sendMessage(
        msg.chat.id,
        'Please register to continue. Execute /register command.',
      );
    }
  }

  private sendWelcomeMessage(chatId: number, user: UserEntity) {
    const welcomeMessage = `Welcome, ${user.username}! Choose an option below:`;
    this.bot.sendMessage(chatId, welcomeMessage, {
      reply_markup: {
        inline_keyboard: getSocialMediaButtons(user),
      },
    });
  }
}
