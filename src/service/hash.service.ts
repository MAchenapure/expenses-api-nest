import * as bcrypt from 'bcrypt';

export const hash = async (data: string): Promise<string> => {
    const saltRounds = 10;
    const response = await bcrypt.hash(data, saltRounds);
    return response;
}

export const compare = async (data1: string, data2: string): Promise<Boolean> => {
    const result = await bcrypt.compare(data1, data2);
    return result;
}