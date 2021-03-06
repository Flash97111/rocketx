class ShipFactory {
  static createShip(x, y, shipPattern, weaponPatterns, ammoPatterns) {
    let ship = new shipPattern.type();

    ship._weapons = [];
    ship._position = new Position(x,y);

    for (const key in shipPattern) {
      if ((key !== 'type') && (key !== 'image'))
        ship[key] = shipPattern[key];
      else if (key === 'image')
        ship._image = framework.getResources()[shipPattern[key]];
    }

    if (weaponPatterns)
      for (let i = 0; i < weaponPatterns.length; i++)
        ship.addWeapon(WeaponFactory.createWeapon(weaponPatterns[i], ammoPatterns[i]));
    return ship;
  }
}

