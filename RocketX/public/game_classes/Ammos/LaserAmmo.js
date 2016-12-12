/**
 * Created by Win10 on 2016. 12. 11..
 */
class LaserAmmo extends BaseAmmo{
  constructor(damage, img, uptime){
    super(damage, img, 0);
    this.uptime = uptime;
  }
  effect(){
    return (entity) => {
      entity.modifyHp(-this.damage);
    }
  }
  createProjectile(x, y, direction) {
    framework.registerEntity(new Beam(this.damage, x, y, this.img, this.effect(), this.uptime));
  }
}
