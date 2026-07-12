# TransitOps Fleet Management System - Entity Relationship Diagram

## Database Schema Overview

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        TRANSITOPS DATABASE SCHEMA                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

## Core Entities

### 1. User
```
┌─────────────────────────────────────────────────────────────┐
│                          USER                               │
├─────────────────────────────────────────────────────────────┤
│ _id: ObjectId                                              │
│ name: String (required)                                     │
│ email: String (required, unique)                            │
│ password: String (required, hashed)                         │
│ phone: String                                              │
│ role: Enum [Admin, Manager, Dispatcher, Driver, Mechanic]  │
│ status: Enum [Active, Inactive, Suspended]                   │
│ avatar: String                                             │
│ lastLogin: Date                                            │
│ permissions: String[]                                       │
│ metadata: Object                                           │
│ createdAt: Date                                            │
│ updatedAt: Date                                            │
└─────────────────────────────────────────────────────────────┘
```

### 2. Role
```
┌─────────────────────────────────────────────────────────────┐
│                          ROLE                               │
├─────────────────────────────────────────────────────────────┤
│ _id: ObjectId                                              │
│ name: String (required, unique)                             │
│ description: String (required)                              │
│ permissions: String[] (required)                             │
│ isActive: Boolean (default: true)                           │
│ metadata: Object                                           │
│ createdAt: Date                                            │
│ updatedAt: Date                                            │
└─────────────────────────────────────────────────────────────┘
```

### 3. Vehicle
```
┌─────────────────────────────────────────────────────────────┐
│                        VEHICLE                              │
├─────────────────────────────────────────────────────────────┤
│ _id: ObjectId                                              │
│ registrationNumber: String (required, unique)               │
│ name: String (required)                                     │
│ model: String (required)                                    │
│ type: Enum [Car, Van, SUV, Truck, Bus] (required)            │
│ capacity: Number (required)                                 │
│ odometer: Number (required, default: 0)                      │
│ acquisitionCost: Number (required)                          │
│ status: Enum [Available, On Trip, In Shop, Retired]         │
│ fuelType: String                                           │
│ year: Number                                               │
│ color: String                                              │
│ vin: String (unique, sparse)                                │
│ insuranceExpiry: Date                                       │
│ lastServiceDate: Date                                      │
│ nextServiceDate: Date                                      │
│ currentLocation: GeoJSON Point                             │
│ assignedDriver: ObjectId → Driver                           │
│ metadata: Object                                           │
│ createdAt: Date                                            │
│ updatedAt: Date                                            │
└─────────────────────────────────────────────────────────────┘
```

### 4. Driver
```
┌─────────────────────────────────────────────────────────────┐
│                         DRIVER                              │
├─────────────────────────────────────────────────────────────┤
│ _id: ObjectId                                              │
│ name: String (required)                                     │
│ email: String (required, unique)                            │
│ phone: String (required)                                    │
│ licenseNumber: String (required, unique)                     │
│ licenseExpiry: Date (required)                              │
│ status: Enum [Available, On Trip, Off Duty, Suspended]       │
│ assignedVehicle: ObjectId → Vehicle                         │
│ currentTrip: ObjectId → Trip                               │
│ totalTrips: Number (default: 0)                             │
│ totalDistance: Number (default: 0)                          │
│ rating: Number (0-5, default: 0)                            │
│ address: String                                            │
│ emergencyContact: Object                                    │
│   - name: String (required)                                │
│   - phone: String (required)                               │
│   - relationship: String (required)                         │
│ documents: Object                                          │
│   - license: String (required)                             │
│   - aadhaar: String                                       │
│   - pan: String                                           │
│ metadata: Object                                           │
│ createdAt: Date                                            │
│ updatedAt: Date                                            │
└─────────────────────────────────────────────────────────────┘
```

### 5. Trip
```
┌─────────────────────────────────────────────────────────────┐
│                          TRIP                               │
├─────────────────────────────────────────────────────────────┤
│ _id: ObjectId                                              │
│ tripId: String (required, unique)                           │
│ vehicle: ObjectId → Vehicle (required)                       │
│ driver: ObjectId → Driver (required)                         │
│ status: Enum [Draft, Dispatched, In Progress, Completed,    │
│               Cancelled]                                     │
│ origin: Object (required)                                   │
│   - address: String (required)                             │
│   - coordinates: [Number, Number]                          │
│   - landmark: String                                       │
│ destination: Object (required)                              │
│   - address: String (required)                             │
│   - coordinates: [Number, Number]                          │
│   - landmark: String                                       │
│ scheduledStartTime: Date (required)                          │
│ scheduledEndTime: Date (required)                            │
│ actualStartTime: Date                                       │
│ actualEndTime: Date                                         │
│ dispatchTime: Date                                          │
│ completedTime: Date                                        │
│ distance: Number (required)                                 │
│ cargoWeight: Number                                         │
│ cargoType: String                                           │
│ passengerCount: Number                                      │
│ estimatedCost: Number (required)                            │
│ actualCost: Number                                          │
│ notes: String                                              │
│ priority: Enum [low, medium, high, urgent]                   │
│ assignedBy: ObjectId → User                                 │
│ metadata: Object                                           │
│ createdAt: Date                                            │
│ updatedAt: Date                                            │
└─────────────────────────────────────────────────────────────┘
```

### 6. Maintenance
```
┌─────────────────────────────────────────────────────────────┐
│                      MAINTENANCE                            │
├─────────────────────────────────────────────────────────────┤
│ _id: ObjectId                                              │
│ vehicle: ObjectId → Vehicle (required)                       │
│ type: Enum [Routine, Repair, Inspection, Emergency]         │
│ status: Enum [Scheduled, In Progress, Completed, Cancelled]  │
│ scheduledDate: Date (required)                              │
│ completedDate: Date                                         │
│ cost: Number (required)                                     │
│ description: String (required)                               │
│ serviceCenter: String                                       │
│ mechanic: String                                           │
│ partsReplaced: String[]                                     │
│ odometerReading: Number                                    │
│ nextServiceDate: Date                                      │
│ performedBy: ObjectId → User                               │
│ metadata: Object                                           │
│ createdAt: Date                                            │
│ updatedAt: Date                                            │
└─────────────────────────────────────────────────────────────┘
```

### 7. FuelLog
```
┌─────────────────────────────────────────────────────────────┐
│                        FUELLOG                              │
├─────────────────────────────────────────────────────────────┤
│ _id: ObjectId                                              │
│ vehicle: ObjectId → Vehicle (required)                       │
│ trip: ObjectId → Trip                                       │
│ date: Date (required, default: now)                          │
│ quantity: Number (required)                                  │
│ unit: String (required, default: liters)                     │
│ cost: Number (required)                                     │
│ costPerUnit: Number (required)                               │
│ fuelType: String (required)                                 │
│ fuelingStation: String                                      │
│ odometerReading: Number (required)                          │
│ filledBy: ObjectId → User                                   │
│ receiptNumber: String                                       │
│ notes: String                                              │
│ metadata: Object                                           │
│ createdAt: Date                                            │
│ updatedAt: Date                                            │
└─────────────────────────────────────────────────────────────┘
```

### 8. Expense
```
┌─────────────────────────────────────────────────────────────┐
│                        EXPENSE                              │
├─────────────────────────────────────────────────────────────┤
│ _id: ObjectId                                              │
│ vehicle: ObjectId → Vehicle (required)                       │
│ trip: ObjectId → Trip                                       │
│ category: Enum [Fuel, Maintenance, Toll, Parking, Repair,    │
│               Miscellaneous] (required)                      │
│ amount: Number (required)                                   │
│ currency: Enum [USD, EUR, INR, GBP] (default: INR)           │
│ date: Date (required, default: now)                          │
│ description: String (required)                              │
│ receiptNumber: String                                       │
│ vendor: String                                              │
│ approvedBy: ObjectId → User                                 │
│ status: Enum [pending, approved, rejected] (default: pending) │
│ rejectionReason: String                                     │
│ metadata: Object                                           │
│ createdAt: Date                                            │
│ updatedAt: Date                                            │
└─────────────────────────────────────────────────────────────┘
```

### 9. Notification
```
┌─────────────────────────────────────────────────────────────┐
│                     NOTIFICATION                             │
├─────────────────────────────────────────────────────────────┤
│ _id: ObjectId                                              │
│ user: ObjectId → User (required)                             │
│ title: String (required)                                    │
│ message: String (required)                                  │
│ type: Enum [Info, Success, Warning, Error, Trip Assigned,    │
│             Trip Completed, Maintenance Due, Vehicle Issue]  │
│ isRead: Boolean (default: false)                             │
│ readAt: Date                                                │
│ actionUrl: String                                           │
│ relatedEntity: Object                                        │
│   - type: String (required)                                 │
│   - id: String (required)                                   │
│ metadata: Object                                           │
│ createdAt: Date                                            │
│ updatedAt: Date                                            │
└─────────────────────────────────────────────────────────────┘
```

### 10. ActivityLog
```
┌─────────────────────────────────────────────────────────────┐
│                     ACTIVITYLOG                             │
├─────────────────────────────────────────────────────────────┤
│ _id: ObjectId                                              │
│ user: ObjectId → User (required)                             │
│ module: Enum [Users, Roles, Vehicles, Drivers, Trips,        │
│           Maintenance, Fuel, Expenses, Settings] (required)   │
│ action: Enum [Create, Update, Delete, View, Login, Logout,    │
│            Export, Import] (required)                        │
│ description: String (required)                               │
│ ipAddress: String                                           │
│ userAgent: String                                           │
│ metadata: Object                                           │
│ createdAt: Date                                            │
│ updatedAt: Date                                            │
└─────────────────────────────────────────────────────────────┘
```

### 11. TripTimeline
```
┌─────────────────────────────────────────────────────────────┐
│                    TRIPTIMELINE                             │
├─────────────────────────────────────────────────────────────┤
│ _id: ObjectId                                              │
│ trip: ObjectId → Trip (required)                             │
│ status: Enum [Draft, Dispatched, In Progress, Completed,      │
│              Cancelled] (required)                            │
│ remarks: String                                             │
│ location: GeoJSON Point                                     │
│   - type: Point                                             │
│   - coordinates: [Number, Number]                           │
│   - address: String                                         │
│ createdBy: ObjectId → User                                  │
│ metadata: Object                                           │
│ createdAt: Date                                            │
│ updatedAt: Date                                            │
└─────────────────────────────────────────────────────────────┘
```

### 12. Settings
```
┌─────────────────────────────────────────────────────────────┐
│                      SETTINGS                              │
├─────────────────────────────────────────────────────────────┤
│ _id: ObjectId                                              │
│ companyName: String (default: TransitOps)                    │
│ currency: Enum [USD, EUR, INR, GBP] (default: INR)          │
│ distanceUnit: Enum [km, miles] (default: km)                 │
│ theme: Enum [light, dark, system] (default: light)           │
│ logo: String                                                │
│ timezone: String (default: Asia/Kolkata)                     │
│ dateFormat: String (default: DD/MM/YYYY)                    │
│ timeFormat: Enum [12h, 24h] (default: 24h)                   │
│ language: String (default: en)                              │
│ notificationSettings: Object                                │
│   - email: Boolean (default: true)                          │
│   - sms: Boolean (default: true)                            │
│   - push: Boolean (default: true)                           │
│ maintenanceSettings: Object                                 │
│   - reminderDays: Number (default: 7)                       │
│   - autoSchedule: Boolean (default: false)                   │
│ tripSettings: Object                                        │
│   - autoDispatch: Boolean (default: false)                   │
│   - requireApproval: Boolean (default: true)                 │
│ metadata: Object                                           │
│ createdAt: Date                                            │
│ updatedAt: Date                                            │
└─────────────────────────────────────────────────────────────┘
```

## Relationships

### One-to-One Relationships
- **Settings** → Singleton (only one document exists)
- **Vehicle.assignedDriver** ↔ **Driver.assignedVehicle** (bidirectional reference)
- **Driver.currentTrip** ↔ **Trip** (current active trip)

### One-to-Many Relationships
- **User** → **Notification** (one user has many notifications)
- **User** → **ActivityLog** (one user has many activity logs)
- **Vehicle** → **Maintenance** (one vehicle has many maintenance records)
- **Vehicle** → **FuelLog** (one vehicle has many fuel logs)
- **Vehicle** → **Expense** (one vehicle has many expenses)
- **Driver** → **Trip** (one driver has many trips)
- **Trip** → **TripTimeline** (one trip has many timeline entries)
- **User** → **Trip** (as assignedBy - one user assigns many trips)

### Many-to-Many Relationships
- **User** ↔ **Role** (via permissions array in User model)
- **Trip** ↔ **Vehicle** (via vehicle reference in Trip)
- **Trip** ↔ **Driver** (via driver reference in Trip)
- **Trip** ↔ **FuelLog** (via trip reference in FuelLog)
- **Trip** ↔ **Expense** (via trip reference in Expense)

## Entity Relationship Diagram (Visual)

```
                    ┌─────────────┐
                    │   SETTINGS  │
                    │  (Singleton)│
                    └─────────────┘
                           │
                    ┌─────────────┐
                    │    USER     │
                    └─────────────┘
                           │
           ┌───────────────┼───────────────┐
           │               │               │
    ┌─────────────┐ ┌─────────────┐ ┌─────────────┐
    │   ROLE      │ │ NOTIFICATION │ │ ACTIVITYLOG  │
    └─────────────┘ └─────────────┘ └─────────────┘
           │
    ┌─────────────┐
    │  VEHICLE    │◄──────────────┐
    └─────────────┘               │
           │                      │
           ├──────────────────────┤
           │                      │
    ┌─────────────┐      ┌─────────────┐
    │   DRIVER    │      │   TRIP      │
    └─────────────┘      └─────────────┘
           │                      │
           │                      ├──────────────┐
           │                      │              │
    ┌─────────────┐      ┌─────────────┐ ┌─────────────┐
    │ MAINTENANCE │      │ TRIPTIMELINE│ │   FUELLOG   │
    └─────────────┘      └─────────────┘ └─────────────┘
                                         │
                                  ┌─────────────┐
                                  │   EXPENSE   │
                                  └─────────────┘
```

## Indexes Summary

### User
- email (unique)
- role
- status
- createdAt

### Role
- name (unique)
- isActive

### Vehicle
- registrationNumber (unique)
- status
- type
- assignedDriver
- currentLocation (2dsphere)
- nextServiceDate
- insuranceExpiry

### Driver
- email (unique)
- licenseNumber (unique)
- status
- assignedVehicle
- currentTrip
- licenseExpiry
- rating

### Trip
- tripId (unique)
- vehicle
- driver
- status
- scheduledStartTime
- assignedBy
- origin.coordinates (2dsphere)
- destination.coordinates (2dsphere)

### Maintenance
- vehicle
- status
- scheduledDate
- nextServiceDate
- performedBy

### FuelLog
- vehicle
- trip
- date
- fuelType
- filledBy

### Expense
- vehicle
- trip
- category
- date
- status
- approvedBy

### Notification
- user
- isRead
- type
- createdAt
- user + isRead (compound)

### ActivityLog
- user
- module
- action
- createdAt
- user + createdAt (compound)

### TripTimeline
- trip
- status
- createdAt
- location (2dsphere)

### Settings
- unique index on empty object (singleton)

## Business Rules & Constraints

### Vehicle
- registrationNumber must be unique
- Status transitions: Available ↔ On Trip ↔ In Shop → Retired
- cargoWeight cannot exceed vehicle capacity (validated at application level)

### Driver
- licenseNumber must be unique
- licenseExpiry must be in the future (validated on save)
- Status transitions: Available ↔ On Trip ↔ Off Duty → Suspended

### Trip
- Status transitions: Draft → Dispatched → In Progress → Completed
- Can be cancelled from any state except Completed
- dispatchTime set automatically when status changes to Dispatched
- completedTime set automatically when status changes to Completed

### Maintenance
- Status transitions: Scheduled → In Progress → Completed
- Can be cancelled from Scheduled state
- completedDate set automatically when status changes to Completed

### Expense
- Status transitions: pending → approved/rejected
- approvedBy required when status is approved
- rejectionReason required when status is rejected

### Notification
- readAt set automatically when isRead changes to true

## Recommended MongoDB Atlas Configuration

### Cluster Tier
- M10 or higher for production
- M0/M2 for development

### Index Strategy
- All indexes as defined above
- Consider TTL index for ActivityLog (retain for 90 days)
- Consider TTL index for Notification (retain for 30 days after read)

### Backup Strategy
- Daily automated backups
- Point-in-time recovery enabled
- Continuous cloud backup for critical data

### Security
- Enable MongoDB Atlas authentication
- Use IP whitelisting
- Enable encryption at rest
- Use TLS for all connections

### Performance Optimization
- Use read replicas for reporting queries
- Enable auto-scaling for high traffic periods
- Monitor slow queries with Atlas Performance Advisor
