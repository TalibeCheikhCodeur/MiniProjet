<?php

namespace Database\Seeders;

use App\Models\Compte;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CompteSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $compte=[
            ["solde"=>4000,"numero_compte"=>"wv_770854519","user_id"=>1],
            ["solde"=>56000,"numero_compte"=>"wv_777875785","user_id"=>2]

        ];
        Compte::insert($compte);
    }
}
