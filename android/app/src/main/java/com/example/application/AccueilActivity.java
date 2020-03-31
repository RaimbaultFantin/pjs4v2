package com.example.application;

import android.content.Intent;
import android.os.Bundle;

import com.google.android.material.floatingactionbutton.FloatingActionButton;
import com.google.android.material.snackbar.Snackbar;

import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;

import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;

import org.json.JSONObject;

public class AccueilActivity extends AppCompatActivity {
    private Button btnChat;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_accueil);

        btnChat = (Button)findViewById(R.id.btnJoinChat);
        btnChat.setOnClickListener(new View.OnClickListener() {
            public void onClick(View v) {
                openActivityChat();
            }
        });
    }

    public void openActivityChat(){
        Intent intentChat = new Intent(this,ChatActivity.class);
        startActivity(intentChat);

    }


}
