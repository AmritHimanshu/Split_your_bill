# Split Your Bill

A web application that helps users manage and split expenses among group members for various trips or events. Users can sign in, create trips, add members, and track expenses. The app calculates the share of each member and allows adjustments for payments made to others.

## Features

- **User Authentication**: Sign up and log in to manage your trips and expenses.
- **Trip Management**: Create and manage trips.
- **Member Management**: Add members to your trips.
- **Expense Tracking**: Add expenses, which are equally divided among trip members.
- **Payment Adjustments**: Subtract amounts if any member pays on behalf of others.

## Installation

Follow these steps to set up the project locally:

1. **Clone the Repository**

   ```bash
   git clone https://github.com/yourusername/split-your-bill.git

## Navigate to the Project Directory

After cloning the repository, change to the project directory using the following command:

```bash
cd split-your-bill

## Install Dependencies

Ensure you have `Node.js` and `npm` or `yarn` installed. Then run:

```bash
npm install

## Set Up Environment Variables

Create a `.env` file in the root directory of the project and add the following environment variables:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

## Run the Application

To start the application, use one of the following commands:

```bash
npm start

## Usage

1. **Sign In / Sign Up**

   Navigate to the sign-in page and create an account or log in with your existing credentials.

2. **Create a Trip**

   After logging in, you can create a new trip from the dashboard. Provide the trip name and description.

3. **Add Members**

   Within each trip, you can add members by their email addresses. Members will receive invitations to join the trip.

4. **Add Expenses**

   When an expense is incurred, add it to the trip. Specify the amount and the member who paid. The amount will be equally divided among all members.

5. **Adjust Payments**

   If a member pays for someone else, you can adjust their balance by subtracting the amount they paid. The application will update the balances accordingly.

## Technologies Used

- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)

## Contributing

Contributions are welcome! To contribute to the project, please follow these steps:

1. **Fork the repository**: Create your own copy of the repository by clicking the "Fork" button on GitHub.

2. **Create a new branch**: Create a new branch for your feature or bug fix.

   ```bash
   git checkout -b your-feature-branch

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For any questions or feedback, please reach out to [your-himanshukumaramrit41855@gmail.com](mailto:himanshukumaramrit41855@gmail.com).


