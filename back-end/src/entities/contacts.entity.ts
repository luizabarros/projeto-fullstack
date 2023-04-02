import { hashSync } from "bcryptjs"
import { BeforeInsert, BeforeRemove, BeforeUpdate, Column, CreateDateColumn, 
    DeleteDateColumn, Entity,
    ManyToOne, PrimaryGeneratedColumn, 
    UpdateDateColumn 
} from "typeorm"
import Clients from "./clients.entity"

@Entity("contacts")
class Contacts {
    @PrimaryGeneratedColumn("uuid")
    id: string
    
    @Column()
    fullName: string

    @Column({ unique: true })
    email: string

    @Column()
    phone: string

    @Column({ select: false })
    password: string

    @Column({ default: true })
    isActive: boolean

    @BeforeRemove()
    isActiveChanged() {
        this.isActive = false
    }

    @BeforeUpdate()
    @BeforeInsert()
    hashPassword() {
        this.password = hashSync(this.password, 10)
    }

    @CreateDateColumn({ type: "date" })
    createdOn: Date

    @UpdateDateColumn({ type: "date" })
    updatedAt: Date

    @DeleteDateColumn({ type: "date" })
    deletedAt: Date

    @ManyToOne(() => Clients, clients => clients.contacts)
    client: Clients
}

export default Contacts