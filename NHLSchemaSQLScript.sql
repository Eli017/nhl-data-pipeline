-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema NHL
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema NHL
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `NHL` DEFAULT CHARACTER SET utf8 ;
USE `NHL` ;

-- -----------------------------------------------------
-- Table `NHL`.`team`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `NHL`.`team` (
  `team_pk` INT NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `points` INT NOT NULL DEFAULT 0,
  PRIMARY KEY (`team_pk`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `NHL`.`game`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `NHL`.`game` (
  `game_pk` INT NOT NULL AUTO_INCREMENT,
  `home_team_pk` INT NOT NULL,
  `away_team_pk` INT NOT NULL,
  `penalty_minutes` INT NOT NULL DEFAULT 0,
  PRIMARY KEY (`game_pk`, `home_team_pk`),
  INDEX `fk_game_team1_idx` (`home_team_pk` ASC),
  INDEX `fk_game_team2_idx` (`away_team_pk` ASC),
  CONSTRAINT `fk_game_team1`
    FOREIGN KEY (`home_team_pk`)
    REFERENCES `NHL`.`team` (`team_pk`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_game_team2`
    FOREIGN KEY (`away_team_pk`)
    REFERENCES `NHL`.`team` (`team_pk`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `NHL`.`player`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `NHL`.`player` (
  `player_pk` INT NOT NULL,
  `name` VARCHAR(45) NULL,
  `age` INT NULL,
  `position` VARCHAR(45) NULL,
  `current_team_pk` INT NOT NULL,
  PRIMARY KEY (`player_pk`),
  INDEX `fk_player_team_idx` (`current_team_pk` ASC),
  CONSTRAINT `fk_player_team`
    FOREIGN KEY (`current_team_pk`)
    REFERENCES `NHL`.`team` (`team_pk`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `NHL`.`goal`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `NHL`.`goal` (
  `goal_pk` INT NOT NULL AUTO_INCREMENT,
  `game_game_pk` INT NOT NULL,
  `scorer_player_pk` INT NOT NULL,
  `assist_player_pk` INT NULL,
  PRIMARY KEY (`goal_pk`, `game_game_pk`),
  INDEX `fk_goal_game1_idx` (`game_game_pk` ASC),
  INDEX `fk_goal_player1_idx` (`scorer_player_pk` ASC),
  INDEX `fk_goal_player2_idx` (`assist_player_pk` ASC),
  CONSTRAINT `fk_goal_game1`
    FOREIGN KEY (`game_game_pk`)
    REFERENCES `NHL`.`game` (`game_pk`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_goal_player1`
    FOREIGN KEY (`scorer_player_pk`)
    REFERENCES `NHL`.`player` (`player_pk`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_goal_player2`
    FOREIGN KEY (`assist_player_pk`)
    REFERENCES `NHL`.`player` (`player_pk`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `NHL`.`hit`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `NHL`.`hit` (
  `hit_pk` INT NOT NULL AUTO_INCREMENT,
  `from_player_pk` INT NOT NULL,
  `game_game_pk` INT NOT NULL,
  `game_home_team_pk` INT NOT NULL,
  PRIMARY KEY (`hit_pk`),
  INDEX `fk_hit_player1_idx` (`from_player_pk` ASC),
  INDEX `fk_hit_game1_idx` (`game_game_pk` ASC, `game_home_team_pk` ASC),
  CONSTRAINT `fk_hit_player1`
    FOREIGN KEY (`from_player_pk`)
    REFERENCES `NHL`.`player` (`player_pk`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_hit_game1`
    FOREIGN KEY (`game_game_pk` , `game_home_team_pk`)
    REFERENCES `NHL`.`game` (`game_pk` , `home_team_pk`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
