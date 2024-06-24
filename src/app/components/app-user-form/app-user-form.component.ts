import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IngredientService } from '../../service/ingredient.service';
import { AppUserService } from '../../service/app-user.service';
import { AppUserDto } from '../../model/app-user-dto';
import { AppRoleDto } from '../../model/app-role-dto';
import { CommonModule } from '@angular/common';
import { AppRoleService } from '../../service/app-role.service';

@Component({
  selector: 'app-app-user-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './app-user-form.component.html',
  styleUrl: './app-user-form.component.scss'
})
export class AppUserFormComponent implements OnInit{

  //Add formbuilder and user service
  constructor(private fb: FormBuilder, 
    private appUserService: AppUserService,
    private appRoleService: AppRoleService){}
    
    userForm!: FormGroup;
    roles: AppRoleDto[] = [];
    mydata:any='';
    
    ngOnInit(): void {
      this.userForm = this.fb.group({
        id: [{ value: '', disabled: true }],
        username: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(6)]],
        email: ['', [Validators.required, Validators.email]],
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        enabled: [true],
        appRoles: this.fb.array([])
      });

      this.loadRoles()
    }

    loadRoles(): void {
      this.appRoleService.getAllRole().subscribe((roles) => {
        this.roles = roles;
        console.log(this.roles);
      });
    }

    get appRoles(): FormArray {
      return this.userForm.get('appRoles') as FormArray;
    }

    addRole(role?: AppRoleDto): void {
      const group = this.fb.group({
        id: [role?.id || '', Validators.required],
        roleName: [role?.roleName || '', Validators.required]
      })
      this.appRoles.push(group);
      group.get('id')?.valueChanges.subscribe(val => {
        const selectedRole = this.roles.find(roleOption => roleOption.id === val);
        group.get('roleName')?.setValue(selectedRole ? selectedRole.roleName : '');
      });
    }
  
    removeRole(index: number): void {
      this.appRoles.removeAt(index);
    }

    onSubmit() {
      if (this.userForm.valid) {
        const user: AppUserDto = this.userForm.value;
        console.log(user);
        this.appUserService.saveUser(user).subscribe({
          next: data => {console.log(data)
            this.mydata=data;
          }
        });
        console.log(this.mydata)
      }
    }
    
    
}
