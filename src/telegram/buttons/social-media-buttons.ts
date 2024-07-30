import { UserEntity } from '../../user/entities/user/user.entity';

export const getSocialMediaButtons = (user: UserEntity) => {
  const gameUrl = `https://8ea4-37-252-94-240.ngrok-free.app/welcome/${user.telegramId}`;
  return [
    [
      {
        text: '🎮 Play Game',
        url: gameUrl,
      },
    ],
    [
      {
        text: '📺 Instagram',
        url: 'https://www.instagram.com/meonixgame?igsh=ZTlyeGVud2phZ2xu',
      },
      {
        text: '🐦 X',
        url: 'https://x.com/meonixgame?s=21&t=ItyXDtv8PfUoFi55qt-PsA',
      },
      {
        text: '🐦 TikTok',
        url: 'https://x.com/meonixgame?s=21&t=ItyXDtv8PfUoFi55qt-PsA',
      },
    ],
  ];
};
