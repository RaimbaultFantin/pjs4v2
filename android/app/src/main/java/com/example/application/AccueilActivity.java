package com.example.application;

import android.content.Intent;
import android.os.Bundle;

import com.google.android.material.floatingactionbutton.FloatingActionButton;
import com.google.android.material.snackbar.Snackbar;

import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;

import android.view.View;
import android.widget.EditText;
import android.widget.TextView;

import org.json.JSONObject;

public class AccueilActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_accueil);

        Intent i = getIntent();

        TextView text = findViewById(R.id.txtAccueil);
        JSONObject json = (JSONObject) i.getSerializableExtra("donnee");
        text.setText(json.toString());

    }

}
