import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query, Res } from '@nestjs/common';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';

@Controller('coffees')
export class CoffeesController {
    // how can we use dependency injection in nest? 
    // well, to inject a provider, you can simply use constructors
    // nest will handle DI for us, this happens by looking at the type whatever we pass into constructor's parameters
    // privatee access modifier syntax below is a typescript shorthand which allows us to both , declare and initialize the coffeesService immediately in the same location
    // as well as making it only accessible within the class itself hence, private.
    // next we utilize the word "readonly" this is more so a best practice but this helps us ensure that we aren't modifying the service reference
    // in fact, only accessing things from 
    // next we are simply naming our parameter here , here thanks to nest and typescript, it extremely easy to manage dependencies because they are resolved simply by their type
    // nest will resolve the coffeesService by creating and returning an instanceof CoffeesService to our CoffeesController
    // or in a normal form of Singelton , returning the existing instance if it is already requested else where
    // this dependecy is resolved and passed to our controller's constructor or assigned to the indicated property here
    constructor(private readonly coffeesService: CoffeesService) {}

    @Get()
    /* although this approach works great and allows for a little bit flexability in some ways by providing full control of the response object like,
    header manipulation, library specifc features and so on, it should use with care!
    In general, the approach is much less clear and have disadvantages and the main one is that
    you lose compatability with nest features that depend on nest standard respond handling which are interceptors and the httpCoode decorator.
    */
    /*
    findAll(@Res() response) {
        response.status(200).send('this action returns all the coffees')
    }
    */

    /* 
    findAll() {
        return 'this action returns all the coffees'
    }
    */

   // Pagination
   // with pagination we can split the massive response into managable chuncks or pages
   // returning only what's needed for each specifc response
   // Best Practice: Use path parameters to identify a specific resource (e.g., /coffees/42 for a coffee with ID 42)
   // Use query parameters to filter, sort, or paginate the results (e.g., /coffees?limit=10&offset=20)
   findAll(@Query() paginationQuery) {
        // here we take advantage of Object distructure to get limit and offset for paginationQuery
        // const { limit, offset } = paginationQuery
        // return `this action returns all the coffees. Limit: ${limit}, offset: ${offset}`
        return this.coffeesService.findAll()
   }

    @Get(':id')
    // the Param decorator lets us grab all incoming request parameters and use them inside of the function body of our method
    // we don't pass anything inside of the Param decorator when we want to recieve all request parameters
    /*
    findOne(@Param() params) {
        return `this action returns ${params.id} coffee`
    }
    */

    // sometimes we don't want to access all the parameters 
    // so, we can access specific portion of params once entering a string (here: id) directly inside of the decorator
    findOne(@Param('id') id: string) {
        // return `this action returns #${id} coffee`
        return this.coffeesService.findOne(id)
    }


    @Post()
    // this decorator is useful when the status code is static
    // @HttpCode(HttpStatus.GONE)

    // here if we pass string to body, may cause validation problems because it access specific part of the body and donot validate the rest
    /*
    create(@Body('name') body) {
        return body;
    }
    */
    create(@Body() createCoffeeDto: CreateCoffeeDto) {
        // return body;
        return this.coffeesService.create(createCoffeeDto)
    }

    /* 
    There are 2 different http method we can use for update: Put and Patch
    Put: replaces the entire resource and because of this we need to have the entire object within the request payload
    Patch: modifies resource partially, allowing us to update even just a single property of the resource it we've like
    */

    @Patch(':id')
    // patch operation does a partial update of a single resource,
    // it require both id and the payload, representing all the possible values for a given resource
    // for this, we take advantage of both Param and Body decorators 
    update(@Param('id') id: string, @Body() updateCoffeeDto: UpdateCoffeeDto) {
        // return `this action updates #${id} coffee`
        return this.coffeesService.update(id, updateCoffeeDto)
    }

    @Delete(':id')
    // just like patch operation, we need to pass id to know which exact item need to be deleted
    remove(@Param('id') id: string) {
        // return `this action removes #${id} coffee`
        return this.coffeesService.remove(id)
    }
}
