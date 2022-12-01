## Assumptions
<ul>
    <li>
        postgres is installed
    </li>
    <li>
        a database named "event_co" is created
    </li>
    <li>
        uuid can be used in postgres
    </li>
</ul>

## Available Scripts

In the project directory, you can run to install the dependencies:
### `yarn install`

<br/>
To migrate the database, you can run:

### `DB_USER=your_username DB_PASSWORD=your_password yarn run db:migrate`

<br/>
To seed the database, you can run:

### `DB_USER=your_username DB_PASSWORD=your_password yarn run db:seed`

<br/>
To run the tests, you can run:

### `yarn run test`

<br/>
To start the project, you can run:

### `DB_USER=your_username DB_PASSWORD=your_password yarn run dev`

<br/>
Runs the app in the development mode.

http://localhost:6060/graphql


## Key Design Considerations

<ul>
    <li>
        two tables will be created. One for event. The other is for booking
    </li>
    <li>
        model layer provides all the database operation
    </li>
    <li>
        service layer contains all the business logic
    </li>
    <li>
        schema layer is used to implement graphql
    </li>
</ul>

## Compromises / Tech-debts

<ul>
    <li>
        Due to limited time for development, test is not fully covered. It only covered the logic of creating booking and updating booking.    
    </li>
    <li>
        The current model layer is more like a dao layer. Some validation logic should not be in the service layer.
        For example: validation of contact and event of booking
        These validations should be within a true model layer.
        This may be solved by using Bookshelf ( https://bookshelfjs.org ) and Checkit ( https://github.com/tgriesser/checkit )
    </li>
</ul>


