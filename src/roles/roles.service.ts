import {Injectable} from "@nestjs/common";
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
  async createRole(createRoleDto: CreateRoleDto) {
    const role = this.roleRepository.create(createRoleDto);
    return await this.roleRepository.save(role);
  }
  async getRoleByValue(value: string) {
    return await this.roleRepository.findOne({where: {value}});
  }
}
