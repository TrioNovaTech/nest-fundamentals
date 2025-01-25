import { IsString } from "class-validator"

// used this: nest g class coffees/dto/create-coffee.dto --no-spec
export class CreateCoffeeDto {
    @IsString()
    readonly name: string

    @IsString()
    readonly brand: string

    @IsString({ each: true })
    readonly flavors: string[]
}
