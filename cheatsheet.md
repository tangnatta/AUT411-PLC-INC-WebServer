## PLC Configuration

### 1511

- CPU 1511-1 PN (AK01) V.1.8
- PM 190W
- DI/DO V.1.0 (16x24)
- AI/AO V.1.0

### 1512

- CPU 1512C-1 PN (CK00) V.2.1
- PM 190W

### Vipa

- CPU 313C (5BF03) V.2.6
- PS 5A
- Profi= CP 343-1 (1EX11)

### 300 (On board)

- CPU 313C-2 PtP (6BF03) V.2.6
- PS 5A
- Profi= CP 343-1 Lean V.3.0

### 300 (Mine)

- CPU 313C-2 DP (6CF03) V.2.6
- PS 5A
- Profi= CP 343-1 Lean V.3.0
- AI/AQ 2x8
- AI/AQ 2x12

### HMI

- Win CC Advance
- IE General

## Clock Memory

- M0.0 ; Clock 10Hz
- M0.1 ; Clock 5Hz
- M0.2 ; Clock 2.5Hz
- M0.3 ; Clock 2Hz
- M0.4 ; Clock 1.25Hz
- M0.5 ; Clock 1Hz
- M0.6 ; Clock 0.625Hz4
- M0.7 ; Clock 0.5Hz

## System Memory

- M1.0 ; First Scan
- M1.1 ; Diag Status Update
- M1.2 ; Always TRUE
- M1.3 ; Always FALSE

## OB Stuff

- OB1 Main
- OB30/35 Cyclic Interupt
- OB100 Run once on reboot

## sth I should know

- Implement cyclic interupt to make a clock

## Graph

### Operator

- L ; `variable, T#XXms` `vairable` will be HIGH after `T#XXms`
- N ; Will be HIGH if that block is running
- S ; Set
- R ; Reset

## SCL (Structured Control Language)

### Elementary Data Types

- BOOL: TRUE, FALSE
- BYTE: 0..255
- WORD: 0..65535
- DWORD: 0..4294967295
- INT: -32768..32767
- DINT: -2147483648..2147483647
- REAL: ±1.18e-38..±3.4e38
- STRING: Text strings
- CHAR: Single characters
- TIME: Time duration
- DATE: Date value
- TIME_OF_DAY (TOD): Time of day
- DATE_AND_TIME (DT): Date and time

### Operators

#### Variable Stuff

- `:=` Assign Variable
- `#variable` Local Variable
- `"Variable"` Global Variable
- `"DB".Attribute` DB Variable

#### Arithmetic Operators

- `+` : Addition
- `-` : Subtraction
- `*` : Multiplication
- `/` : Division
- `MOD` : Modulo
- `**` : Exponentiation

#### Comparison Operators

- `=` : Equal to
- `<>` : Not equal to
- `<` : Less than
- `>` : Greater than
- `<=` : Less than or equal to
- `>=` : Greater than or equal to

#### Logical Operators

- `AND` : Logical AND
- `OR` : Logical OR
- `NOT` : Logical NOT
- `XOR` : Exclusive OR

### Control Structures

#### IF Statement

```pascal
IF condition THEN
    statements;
ELSIF condition THEN
    statements;
ELSE
    statements;
END_IF;
```

#### CASE Statement

```pascal
CASE variable OF
    1: statement1;
    2: statement2;
    3..5: statement3;
    ELSE
        default_statement;
END_CASE;
```

#### FOR Loop

```pascal
FOR i := start TO end BY step DO
    statements;
END_FOR;
```

#### WHILE Loop

```pascal
WHILE condition DO
    statements;
END_WHILE;
```

#### REPEAT Loop

```pascal
REPEAT
    statements;
UNTIL condition
END_REPEAT;
```

## Functions and Function Blocks

### Function Declaration

```pascal
FUNCTION FunctionName : ReturnType
VAR_INPUT
    Input1 : DataType;
END_VAR
VAR
    LocalVar : DataType;
END_VAR
BEGIN
    // Function code
    FunctionName := ReturnValue;
END_FUNCTION
```

### Function Block Declaration

```pascal
FUNCTION_BLOCK BlockName
VAR_INPUT
    Input1 : DataType;
END_VAR
VAR_OUTPUT
    Output1 : DataType;
END_VAR
VAR
    InternalVar : DataType;
END_VAR
BEGIN
    // Function block code
END_FUNCTION_BLOCK
```

### Common Built-in Functions

#### String Functions

- CONCAT(str1, str2) : Concatenates strings
- LEN(str) : Returns string length
- LEFT(str, len) : Left substring
- RIGHT(str, len) : Right substring
- MID(str, pos, len) : Middle substring
- FIND(str1, str2) : Finds substring position

#### Mathematical Functions

- ABS(x) : Absolute value
- SQRT(x) : Square root
- LN(x) : Natural logarithm
- EXP(x) : Exponential
- SIN(x) : Sine
- COS(x) : Cosine
- TAN(x) : Tangent

#### Conversion Functions

- BOOL_TO_INT
- INT_TO_REAL
- REAL_TO_STRING
- TIME_TO_DINT
- STRING_TO_INT

#### Time Functions

- TIME_TO_STRING
- DATE_TO_STRING
- TOD_TO_STRING
- ADD_TIME
- SUB_TIME

### Arrays and Structures

#### Array Declaration

```pascal
VAR
    ArrayName : ARRAY[0..9] OF INT;
    Matrix : ARRAY[1..3, 1..3] OF REAL;
END_VAR
```
