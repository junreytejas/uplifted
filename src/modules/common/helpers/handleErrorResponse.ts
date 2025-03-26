import {
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';

export const handleErrorResponse = (error: any) => {
  switch (error.code) {
    case 'P2000':
      throw new BadRequestException('Value too long for column');
    case 'P2001':
      throw new BadRequestException('Record not found');
    case 'P2002':
      throw new BadRequestException('Unique constraint failed');
    case 'P2003':
      throw new BadRequestException('Foreign key constraint failed');
    case 'P2004':
      throw new BadRequestException('Constraint failed');
    case 'P2005':
      throw new BadRequestException('Invalid value for field');
    case 'P2006':
      throw new BadRequestException('Invalid value');
    case 'P2007':
      throw new BadRequestException('Data validation error');
    case 'P2008':
      throw new InternalServerErrorException('Query parsing failed');
    case 'P2009':
      throw new InternalServerErrorException('Query validation failed');
    case 'P2010':
      throw new InternalServerErrorException('Raw query failed');
    case 'P2011':
      throw new BadRequestException('Null constraint violation');
    case 'P2012':
      throw new BadRequestException('Missing required value');
    case 'P2013':
      throw new BadRequestException('Missing required argument');
    case 'P2014':
      throw new InternalServerErrorException('Relation violation');
    case 'P2015':
      throw new InternalServerErrorException('Related record not found');
    case 'P2016':
      throw new InternalServerErrorException('Query interpretation error');
    case 'P2017':
      throw new InternalServerErrorException('Relation not connected');
    case 'P2018':
      throw new InternalServerErrorException('Connected records not found');
    case 'P2019':
      throw new InternalServerErrorException('Input error');
    case 'P2020':
      throw new InternalServerErrorException('Value out of range');
    case 'P2021':
      throw new InternalServerErrorException('Table not found');
    case 'P2022':
      throw new InternalServerErrorException('Column not found');
    case 'P2023':
      throw new InternalServerErrorException('Inconsistent column data');
    case 'P2024':
      throw new InternalServerErrorException('Connection pool timeout');
    case 'P2025':
      throw new BadRequestException('Dependent record not found');
    case 'P2026':
      throw new InternalServerErrorException('Unsupported feature');
    case 'P2027':
      throw new InternalServerErrorException('Multiple database errors');
    case 'P2030':
      throw new InternalServerErrorException('Fulltext index not found');
    case 'P2031':
      throw new InternalServerErrorException('Prisma restart needed');
    case 'P2033':
      throw new InternalServerErrorException('Number too large');
    default:
      throw new InternalServerErrorException();
  }
};
