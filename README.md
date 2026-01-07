## How to run the project

To run the project you will need npm.
Run commands: npm run dev
db comands: npx prisma generate (to generate the db)
            npx prisma studio (to open the db)

## Security Validation

A minimal server-side validation layer was added for authentication inputs.  
A new module (`lib/securityValidation.ts`) validates email format and password constraints.  
This validation is enforced in both register and login API routes before database access.  
This ensures robustness and defensive validation.

