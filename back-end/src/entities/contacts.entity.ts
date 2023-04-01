import { Column, CreateDateColumn, 
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