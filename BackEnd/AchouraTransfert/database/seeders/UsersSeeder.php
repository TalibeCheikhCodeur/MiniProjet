<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UsersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = [
            ["nom"=>"Diallo","prenom"=>"khaoussou","telephone"=>770854519],
            ["nom"=>"Ndiaye","prenom"=>"Mouhamed","telephone"=>777875785],
            ["nom"=>"Ly","prenom"=>"Moustapha","telephone"=>777665545]
        ];
        User::insert($user);
    }
}
