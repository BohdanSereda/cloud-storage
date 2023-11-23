import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {CreateRoleDto} from "./dto";
import {InjectRepository} from "@nestjs/typeorm";
import {Role} from "./entities";
import {Repository} from "typeorm";

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>
  ) {}
  async create(createRoleDto: CreateRoleDto) {
    const role = this.roleRepository.create(createRoleDto);
    return await this.roleRepository.save(role);
  }
  async get(value: string) {
    const role = await this.getByValue(value);
    if (!role) {
      throw new HttpException("Role does not exist", HttpStatus.NOT_FOUND);
    }
    return role;
  }
  async getByValue(value: string) {
    return await this.roleRepository.findOne({where: {value}});
  }
}
