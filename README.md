# business-rest
A Rest API implementation for businesses management using NodeJS, Express and PostgreSQL

**Highlighted** data are optional

### Business endpoints:
| Method | Endpoint | Parameters | Data | Description |
| :--- | :--- | :--- | :--- | :--- |
| `GET` | `/business` |  | | Fetch all businesses |
| `GET` | `/business/:id` | `Business ID` | | Fetch business with given ID |
| `POST` | `/business` |  | name, location, **type** | Create a business |
| `PUT` | `/business/:id` | `Business ID` | | Update business information |
| `DELETE` | `/business/:id` | `Business ID` | | Delete a business from the database |

### Staff endpoints:
| Method | Endpoint | Parameters | Data | Description |
| :--- | :--- | :--- | :--- | :--- |
| `GET` | `/business/:id/staff` | `Business ID` | | Get all staff members for given business |
| `GET` | `/staff/:staff_id` | `Staff ID` | | Get staff member with given id |
| `POST` | `/business/:id/staff` | `Business ID` | email, first_name, last_name, position, **phone_number** | Create a staff member for given business |
| `PUT` | `/staff/:staff_id` | `Staff ID` | | Update given staff member's info |
| `DELETE` | `/staff/:staff_id` | `Staff ID` | | Delete a staff member from the database |
