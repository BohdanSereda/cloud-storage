import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {AddRoleDto, CreateUserDto} from "./dto";
import {Repository} from "typeorm";
import {User} from "./entities";
import {InjectRepository} from "@nestjs/typeorm";
import {RolesService} from "src/roles/roles.service";
import {UpdateUserDto} from "./dto/update-user.dto";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private roleService: RolesService
  ) {}

  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.getByEmail(createUserDto.email);

    if (existingUser) {
      throw new HttpException(
        "User with this email already exists",
        HttpStatus.BAD_REQUEST
      );
    }

    const role = await this.roleService.getByValue("User");
    const user = {...createUserDto, roles: [role]};
    return await this.userRepository.save(user);
  }

  async getAll() {
    return await this.userRepository.find({
      relations: ["roles"],
    });
  }

  async getByEmail(email: string) {
    return await this.userRepository.findOne({
      where: {
        email,
      },
      relations: ["roles"],
    });
  }

  async getById(id: string) {
    const user = await this.userRepository.findOne({
      where: {
        id,
      },
      relations: ["roles"],
    });
    if (!user) {
      throw new HttpException("User does not exist", HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async addRole(addRoleDto: AddRoleDto) {
    const user = await this.getById(addRoleDto.userId);
    const role = await this.roleService.getByValue(addRoleDto.value);
    if (user && role) {
      user.roles.push(role);
      return await this.userRepository.save(user);
    }

    throw new HttpException(
      "User or role does not exist",
      HttpStatus.NOT_FOUND
    );
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const toUpdate = await this.getById(id);
    delete toUpdate.password;

    const updated = Object.assign(toUpdate, updateUserDto);
    return await this.userRepository.save(updated);
  }
}
