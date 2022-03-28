import { createAvatar } from '@dicebear/avatars';
import * as style from '@dicebear/big-ears-neutral';

export default class Player
{
  constructor(username) {
    this.username = username
    this.avatar = createAvatar(style, {
      seed: username
    })
  }
}