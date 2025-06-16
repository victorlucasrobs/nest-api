import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './user.entity';
import TestUtil from './../common/test/TestUtil';
import { InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { ExplainVerbosity } from 'typeorm';

describe('UserService', () => {
  let service: UserService;

  const mockRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  }
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService,
        {
          provide: getRepositoryToken(User),
          useValue: mockRepository,
        }
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  beforeEach(()=>{
    mockRepository.create.mockReset();    
    mockRepository.delete.mockReset();
    mockRepository.find.mockReset();
    mockRepository.findOne.mockReset();
    mockRepository.save.mockReset();
    mockRepository.update.mockReset();
  })


  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe("findAllUsers", () => {
    it("should be list all users",async () => {
        const user = TestUtil.giveMeAvaliduser();
        mockRepository.find.mockReturnValue([user, user]);
        const users = await service.findAllUsers();
        expect(users).toHaveLength(2);
        expect(mockRepository.find).toHaveBeenCalledTimes(1);
    });
  });

  describe("FindUserById", () => {
    it("should find a existing user", async ()=>{
      const user = TestUtil.giveMeAvaliduser();
      mockRepository.findOne.mockReturnValue(user);
       const userFound = await service.findUserById('1');
       expect(userFound).toMatchObject({ name: user.name });
       expect(mockRepository.findOne).toHaveBeenCalledTimes(1)

    });
    it("should retorn a exception when does not to find a user",async ()=>{
      mockRepository.findOne.mockReturnValue(null);
      expect(service.findUserById('14')).rejects.toBeInstanceOf(
        NotFoundException,
      );
      expect(mockRepository.findOne
      ).toHaveBeenCalledTimes(1)
    });
  });

  describe("create user", ()=>{
    it("should create a user",async()=>{
      const user = TestUtil.giveMeAvaliduser();
      const userToCreate = { name: user.name, email: user.email, password: 'testpassword' };
      mockRepository.save.mockReturnValue(userToCreate);
      mockRepository.create.mockReturnValue(userToCreate);
      const saveUser = await service.createUser(userToCreate);
      expect(saveUser).toMatchObject(userToCreate);
      expect(mockRepository.create).toBeCalledTimes(1);
      expect(mockRepository.save).toBeCalledTimes(1);
    });
  
  it("should return a exception when doesnt create a user", async () =>{
    const user = TestUtil.giveMeAvaliduser();
      const userToCreate = { name: user.name, email: user.email, password: 'testpassword' };
      mockRepository.save.mockReturnValue(user);
      mockRepository.create.mockReturnValue(user);

      await service.createUser(userToCreate).catch(e=> {
        expect(e).toBeInstanceOf(InternalServerErrorException);
        expect(e).toMatchObject({message: "problem in the  creation of the user",});
      });
    expect(mockRepository.create).toBeCalledTimes(1);
    expect(mockRepository.save).toBeCalledTimes(1);
    });
  });
    describe("updateUser", ()=>{
      it("should update a user",async ()=>{
        const user = TestUtil.giveMeAvaliduser();
        const updateUser = {name: "New Name"};
        mockRepository.findOne.mockReturnValue(user);
        mockRepository.update.mockReturnValue({
          ...user,
          ...updateUser
        });
        mockRepository.create.mockReturnValue({
          ...user,
          ...updateUser
        });
        const result = await service.updateUser("1",{
          ...user,
          name: "New Name"
        })
        expect(result).toMatchObject(updateUser);
        expect(mockRepository.create).toBeCalledTimes(1);
        expect(mockRepository.findOne).toBeCalledTimes(1);
        expect(mockRepository.update).toBeCalledTimes(1);        
      });
    });
    describe("deleteUser",()=>{
      it("should delete a existing user", async()=>{
        const user = TestUtil.giveMeAvaliduser();
        mockRepository.delete.mockReturnValue(user);
        mockRepository.findOne.mockReturnValue(user);

        const deletedUser = await service.deleteUser("1");

        expect(deletedUser).toBe(true);
        expect(mockRepository.findOne).toBeCalledTimes(1);
        expect(mockRepository.delete).toBeCalledTimes(1);
      });
      it("should not delete a inexisting user", async()=>{
        const user = TestUtil.giveMeAvaliduser();
        mockRepository.delete.mockReturnValue(null);
        mockRepository.findOne.mockReturnValue(user);

        const deletedUser = await service.deleteUser("64");

        expect(deletedUser).toBe(false);
        expect(mockRepository.findOne).toBeCalledTimes(1);
        expect(mockRepository.delete).toBeCalledTimes(1);
      });
    });
});
