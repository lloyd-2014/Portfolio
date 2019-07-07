section	.text
    global _start

_start:
    mov AX, BX      ; move the 16-bit address from BX to AX
                    ; assume that the address was stored in BX
    push AX         ; save the original AX
    push 0x01       ; 1
    push 0x00       ; 0
    push 0x03       ; 3
    push 0x05       ; 5
    push 0x000A     ; 10
    push [eip+2]    ; the 32-bit return address
    trap IDE_access 
_IDE_access:   
    push ebp
    mov ebp, esp
    
    cmp [esp+6], 0x00   ; access primary master 
    je primaryMaster

    cmp [esp+6], 0x01   ; access primary slave
    je primarySlave
    
    cmp [esp+6], 0x02   ; access secondary master
    je secondaryMaster 
    
    cmp [esp+6], 0x03   ; access secondary slave
    je secondarySlave
    jmp err             ; error

    primaryMaster:
        cmp [esp+7], 0x00   ; check for read operation
        je pm1
        cmp [esp+7], 0x10   ; check for write operation
        je pm2
        pm1:                    ; read
            AND 0x1F7, 0x40     ; check if BSY is set
            jnz pm1             ; if BSY set, busy wait
            AND 0x1F7, 0xC0     ; check if DRDY is set 
            jz pm1              ; if DRDY is not set, busy wait
            mov AL, 0x00        ; master drive is selected      
            out AL, 0xF7        ; program drive/head
            mov AX, [esp+10]    ; move cylinder_address into AX
            out AX, 0x1F5       ; program cylinder_address 
            mov AL, [esp+9]     ; move sector_address into AL
            out AL, 0x1F3       ; program sector number
            mov AL, [esp+8]     ; move sector_count into AL
            out AL, 0x1F2       ; program sector count
            out 0x21, 0x1F7;    ; program command register for read operation
            pmRead:             ; begin reading
                AND 0x1F7, 0x09 ; check if DRQ && ERR == 0 
                jz pmRead       ; continue reading if DRQ && ERR == 0 
                AND 0x1F7, 0x01 ; check if ERR = 1
                jnz pmReadErr   ; ERR = 1 if AND operation != 0
                AND 0x1F7, 0x08 ; check if DRQ = 1
                jnz pmGetData   ; read data if DRQ is set 
                jmp pmRead      ; if DRQ = 0 busy wait
                pmReadErr:      ; exit function 
                    mov esp, ebp
                    pop ebp
                    ret 10
                pmGetData:
                    mov DX, 0xF0    ; read data from IDE
                    mov DI, [esp+4] ; address of the char array
                    mov CX, 256     ; number of words to be transferred (512 bytes)
                    REP INSW        ; 512 bytes read from the data register port
                                    ; and stored in the char array
                    cmp 0x1F2, 0x00 ; check if sector count is 0
                    jnz pmRead      ; if sector != 0, read next sector
                    jmp endIf       ; exit function
                
        pm2:                    ; write
            AND 0x1F7, 0x40     ; check if BSY is set
            jnz pm2             ; if BSY set, busy wait
            AND 0x1F7, 0xC0     ; check if DRDY is set 
            jz pm2              ; if DRDY is not set, busy wait
            mov AL, 0x00        ; master drive is selected      
            out AL, 0xF7        ; program drive/head
            mov AX, [esp+10]    ; move cylinder_address into AX
            out AX, 0x1F5       ; program cylinder_address 
            mov AL, [esp+9]     ; move sector_address into AL
            out AL, 0x1F3       ; program sector number
            mov AL, [esp+8]     ; move sector_count into AL
            out AL, 0x1F2       ; program sector count
            out 0x31, 0x1F7;    ; program command register for read operation
            pmWrite:            ; begin reading
                AND 0x1F7, 0x09 ; check if DRQ && ERR == 0 
                jz pmWrite      ; continue reading if DRQ && ERR == 0 
                AND 0x1F7, 0x01 ; check if ERR = 1
                jnz pmWriteErr  ; ERR = 1 if AND operation != 0
                AND 0x1F7, 0x08 ; check if DRQ = 1
                jnz pmWriteData ; write data if DRQ is set 
                jmp pmWrite     ; if DRQ = 0 busy wait
                pmWriteErr:     ; exit function 
                    mov esp, ebp
                    pop ebp
                    ret 10
                pmWriteData:
                    out DX, 0xF0    ; IDE data register port
                    mov DI, [esp+4] ; address of the char array
                    mov CX, 256     ; number of words to be transferred (512 bytes)
                    REP OUTSW       ; 512 bytes written to the data register port
                                    ; froms the char array
                    AND 0x1F7, 0x40 ; check if BSY is set
                    jnz pmWriteData ; if BSY set, busy wait
                    cmp 0x1F2, 0x00 ; check if sector count is 0
                    jnz pmWrite     ; if sector != 0, read next sector
                    jmp endIf       ; exit function
    primarySlave:
    secondaryMaster:
    secondarySlave:
    endIf:
        mov esp, ebp
        pop ebp
        ret 10
section .data